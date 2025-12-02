async function basic_retry(fn: () => Promise<any>, retries = 3, delay = 1000) {
    console.log('RETRY NUMBER: ', retries);
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        return basic_retry(fn, retries - 1, delay);
    }
}

const fetch_data = async () => {
    return basic_retry(async () => {
        const response = await fetch('https://api.example.com/data');
        return response.json();
    });
};

fetch_data();