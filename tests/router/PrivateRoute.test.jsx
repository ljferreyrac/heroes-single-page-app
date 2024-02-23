import { render, screen } from "@testing-library/react";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

describe('Pruebas en <PrivateRoute/>', () => { 
    test('should show children if authenticated', () => {
        
        Storage.prototype.setItem = jest.fn();

        const contextValue =  {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Leonardo'
            }
        }
        
        const routesConfig = [
            {
                path: '/marvel',
                element: 
                (<PrivateRoute>
                    <h1>Ruta privada</h1>
                </PrivateRoute>)
            }
        ]

        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/marvel']
        })
        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        )
        
        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    });    
})