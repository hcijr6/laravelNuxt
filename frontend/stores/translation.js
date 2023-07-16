import { defineStore } from 'pinia';

export const useTranslationStore = defineStore('translation', {
    state: () => ({
        translations: [],
    }),
    actions: {
        async index() {
            try {
                const response = await submitRequest($larafetch('/api/v1/translation'));
                if (response.status === 200) {
                    this.translations = response.data;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async store(translation, refresh = true) {
            try {
                const petition = {
                    response: true,
                    method: 'post',
                    body: translation,
                };
                const response = await submitRequest($larafetch('/api/v1/translation', petition));
                if (refresh) {
                    this.translations.push(response.data);
                }
                return response;
            } catch (error) {
                console.error(error);
            }
            return response;
        },
        async show(translationId) {
            try {
                const response = await submitRequest($larafetch(`/api/v1/translation/${translationId}`));
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            } catch (error) {
                console.log(error);
            }
            return null;
        },
        async update(translation, refresh = true) {
            try {
                const petition = {
                    response: true,
                    method: 'put',
                    body: translation,
                };
                const response = await submitRequest($larafetch(`/api/v1/translation/${translation.id}`, petition));
                console.log(response)
                if (response.data) {
                    if (refresh) {
                        const index = this.translations.findIndex((t) => t.id === translation.id);
                        if (index !== -1) {
                            this.translations[index] = response.data;
                        }
                    }
                }
                return response;
            } catch (error) {
                console.error(error);
            }
        },
        async destroy(translationId, refresh = true) {
            try {
                const response = await submitRequest($larafetch(`/api/v1/translation/${translationId}`, { method: 'delete' }));
                if (response.status === 204) {
                    if (refresh) {
                        const index = this.translations.findIndex((t) => t.id === translationId);
                        if (index !== -1) {
                            this.translations.splice(index, 1);
                        }
                    }
                    return true;
                }
            } catch (error) {
                console.error(error);
            }
            return false;
        },
    },
});
