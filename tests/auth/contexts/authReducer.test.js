import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => { 
    test('should return default state', () => { 
        const state = authReducer({logged: false}, {});
        expect( state ).toEqual({logged: false});
    });

    test('should call login function and set the user', () => { 
        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                name: 'Leonardo',                
            }
        }
        
        const state = authReducer({logged: false}, action);
        expect( state ).toEqual({
            logged: true,
            user: action.payload
        });
    });    
    
    test('should call logout function, erase the user and set logged in false', () => { 
        const action = {
            type: types.logout
        }
        
        const state = authReducer({logged: true, user: {id: 'ABC', name: 'Leonardo'}}, action);
        expect( state ).toEqual({
            logged: false
        });
    });    
})