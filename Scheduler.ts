import { CronJob } from 'cron';
import { resetLimitsForNewMonth } from './models/LimitModel';

// Define a cron job to run at the beginning of each month
const job = new CronJob('0 0 1 * *', async () => {
    try {
        console.log('Running task to reset limits for new month...');
        await resetLimitsForNewMonth();
        console.log('Limits reset successfully.');
    } catch (error) {
        console.error('Error resetting limits for new month:', error);
    }
});

// Start the cron job
job.start();
