interface IOptions {
    base_delay?: number;
    max_delay?: number;
    max_retries?: number;
    jitter?: boolean;
}

class exponential_backoff_retry {
    base_delay: any;
    max_delay: any;
    max_retries: any;
    jitter: any;

    constructor(options: IOptions = {}) {
        this.base_delay = options.base_delay || 1000;
        this.max_delay = options.max_delay || 30000;
        this.max_retries = options.max_retries || 5;
        this.jitter = options.jitter || true;
    }

    async execute(fn: () => Promise<any>) {
        let retries = 0;
        console.log('RETRIES: ', retries);

        while (true) {
            try {
                return await fn();
            } catch (error: any) {
                if (retries >= this.max_retries) {
                    throw new Error(`Failed after ${retries} retries: ${error.message}`);
                }

                const delay = this.calculate_delay(retries);
                console.log('DELAY: ', delay);
                await this.wait(delay);
                retries++;
            }
        }
    }

    calculate_delay(retry_count: number) {
        let delay = Math.min(
            this.max_delay,
            Math.pow(2, retry_count) * this.base_delay
        );

        if (this.jitter) {
            delay = delay * (.5 + Math.random());
        }

        return delay;
    }

    wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const fetch_data = async () => {
    const retry = new exponential_backoff_retry({ max_retries: 3 });

    return retry.execute(async () => {
        const response = await fetch('https://api.example.com/data');
        return response.json();
    });
};

fetch_data();