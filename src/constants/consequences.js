import service from '../services/service';

export default async function (consequence, choiceIndex, choiceTextInput, choiceData){
    // Check if username is taken or not
    if (consequence === 0) {
        const result = await service.checkUsernameTaken(choiceTextInput);
        if (result.data === true) {
            return {success: false, error: 'Username already taken'};
        }
        return {success: true};
    }
    // Check if email is taken
    if (consequence === 1) {
        const result = await service.checkEmailTaken(choiceTextInput);
        if (result.data === true) {
            return {success: false, error: 'Email already taken'};
        }
        return {success: true};
    }
    // register
    if (consequence === 2) {
        try {
            const body = {
                username: choiceData[0],
                email: choiceData[1],
                password: choiceData[2],
            }
            const result = await service.register(body);
            console.log(result);
            if (result.data === true) {
                return {success: true};
            }
        } catch (error) {
            return {success: false, error: 'Invalid information', choiceAfterError: 0};
        }
    }
    // log in
    if (consequence === 3) {
        try {
            const body = {
                email: choiceData[0],
                password: choiceData[1],
            }
            await service.login(body);
            return {success: true};
        } catch (error) {
            return {success: false, error: 'Invalid information', choiceAfterError: 0};
        }
    }
    // Attack
    if (consequence === 4) {
        try {
            const result = await service.attackAnimal(choiceIndex);
            console.log(result);
            console.log('successs!!!');
            return {success: true, fightResponse: result};
        } catch (error) {
            return {success: false, error: 'Something went wrong'};
        }
    }
}