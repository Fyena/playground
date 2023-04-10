import axios from 'axios';

axios.defaults.withCredentials = true;

const cookie = 'http://localhost:8000';
const url = cookie + '/api';

// const headers = {
//     headers: {
//         'Accept': 'application/json',
//     }
// }

export default new class {
    async checkUsernameTaken(name) {
        return await axios.get(url + '/usernametaken/' + name);
    }
    async checkEmailTaken(email) {
        return await axios.post(url + '/emailtaken/' + email);
    }
    async register(body) {
        return await axios.post(url + '/register', body);
    }
    async login(body) {
        await axios.get(cookie + '/sanctum/csrf-cookie');
        return await axios.post(url + '/login', body);
    }
    async test() {
        return await axios.get(url + '/test');
    }
    async startAnimalFight(id) {
        return await axios.get(url + '/startanimalfight/' + id);
    }
    async attackAnimal(moveindex) {
        return await axios.get(url + '/attackanimal/' + moveindex);
    }
}