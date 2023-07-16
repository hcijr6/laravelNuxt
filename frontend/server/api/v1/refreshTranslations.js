import fs from 'fs';
import path from 'path';
export default defineEventHandler(async ({ $fetch }) => {
    var config = useRuntimeConfig();
    try {
        const languageCodes = ['es', 'en'];
        // return languageCodes;

        const apiBaseUrl = config.public.API_BASE_URL + config.public.API_BASE_VERSION;
        const translationsDir = path.join(process.cwd(), '/lang');
        for (const langCode of languageCodes) {
            const url = `${apiBaseUrl}translations/last/${langCode}`;
            const response = await $fetch(url);
            // return response;
            if (response.data) {
                const jsonData = response.data;
                const jsonFilePath = path.join(translationsDir, `${langCode}.json`);
                if (!fs.existsSync(jsonFilePath)) {
                    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));
                } else {
                    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData), { flag: 'w' });
                }
            }
        }
        return { message: 'Translations refreshed successfully.' };
    } catch (error) {
        return error;
    }
});