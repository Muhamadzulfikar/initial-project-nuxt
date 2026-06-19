export default defineEventHandler(async (event) => {
    const method = getMethod(event);

    if (method == "GET") {
        return {
            data: [
                {
                    label: 'You have 3 new messages',
                    to: '/'
                },
                {
                    label: 'Task assigned to you',
                    to: '/',
                },
                {
                    label: 'Meeting in 15 minutes',
                    to: '/'
                }
            ],
            count: 3,
        }
    }
});
