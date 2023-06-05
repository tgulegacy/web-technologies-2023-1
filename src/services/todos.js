import api from "./api.js";

export default class Todos {
    static create = async description => {
        try {
            const response = await api('/todo', { method: 'POST', body: JSON.stringify({ description: description }) });
            return response;
        } catch (e) {
            return null;
        }
    };

    static getById = async id => {
        const response = await api('/todo/' + id, { method: 'GET' });
        return response.data;
    };

    static getAll = async () => {
        try {
            const response = await api('/todo');
            console.log(response);
            return response.data;
        } catch (e) {
            console.log(e);
            // если запрос выполнился плохо, делаем это ещё раз
            return Todos.getAll();
        }

    };

    static updateStatusById = async (id, completed) => {
        try {
            const response = await api('/todo/' + id, { method: 'PUT', body: JSON.stringify({ completed: completed }) });
            return response;
        } catch (e) {
            return null;
        }

    };

    static deleteById = async id => {
        try {
            return await api('/todo/' + id, { method: 'DELETE' });;
        } catch (e) {
            // такая же как и в getAll
            return Todos.deleteById(id);
        }
    };
}