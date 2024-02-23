import { types } from "../../../src/auth";

describe('Pruebas en types.js', () => { 
    test('should return this types', () => { 
       expect(types).toEqual(
        {
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        }
       )
    });    
})