import { defineStore } from 'pinia';

export const useAdminPostStore = defineStore('post', {
    state: () => ({
        posts: [],
    }),
    actions: {
        async index() {
            try {
                const response = await submitRequest($larafetch('/api/v1/post'));
                if (response.status === 200) {
                    this.posts = response.data;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async store(post, refresh = true) {
            try {
                const petition = {
                    response: true,
                    method: 'post',
                    body: post,
                };
                const response = await submitRequest($larafetch('/api/v1/post', petition));
                if (refresh) {
                    this.posts.push(response.data);
                }
                return response;
            } catch (error) {
                console.error(error);
            }
            return response;
        },
        async show(postId) {
            try {
                const response = await submitRequest($larafetch(`/api/v1/post/${postId}`));
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
        async update(post, refresh = true) {
            try {
                const petition = {
                    response: true,
                    method: 'put',
                    body: post,
                };
                const response = await submitRequest($larafetch(`/api/v1/post/${post.id}`, petition));
                console.log(response)
                if (response.data) {
                    if (refresh) {
                        const index = this.posts.findIndex((t) => t.id === post.id);
                        if (index !== -1) {
                            this.posts[index] = response.data;
                        }
                    }
                }
                return response;
            } catch (error) {
                console.error(error);
            }
        },
        async destroy(postId, refresh = true) {
            try {
                const response = await submitRequest($larafetch(`/api/v1/post/${postId}`, { method: 'delete' }));
                if (response.status === 204) {
                    if (refresh) {
                        const index = this.posts.findIndex((t) => t.id === postId);
                        if (index !== -1) {
                            this.posts.splice(index, 1);
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
