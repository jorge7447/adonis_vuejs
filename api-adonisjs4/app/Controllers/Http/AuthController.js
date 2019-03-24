'use strict'

const User = use('App/Models/User');

class AuthController {
    async login({request, response, auth}){
        const { user } = request.all();
        const logged = await auth.attempt(user.email, user.password, true);
        return response.status(200).json(logged);
    }

    async register({request, response}){
        const userIntance = new User();
        const { user } = request.all();

        userIntance.username = user.email;
        userIntance.email = user.email;
        userIntance.password = user.password;

        await userIntance.save();
        
        return response.status(200).json(userIntance);
    }

    async profile({request, response, auth}){
        const user = await auth.getUser();
        const userInput = request.input('user');
        user.email = userInput['email'];
        user.username = userInput['username'];

        await user.save();
        const logged = await auth.generate(user, true);
        return response.status(200).json(logged);
    }
}

module.exports = AuthController
