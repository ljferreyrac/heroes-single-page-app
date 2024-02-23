import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../src/auth"
import { PublicRoute } from "../../src/router/PublicRoute"
import { RouterProvider, createMemoryRouter } from "react-router-dom"

describe('Pruebas en <PublicRoute/>', () => { 
    test('should show childrens if not authenticated', () => {
        
        const contextValue =  {
            logged: false
        }
        
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )
        
        expect(screen.getByText('Ruta pública')).toBeTruthy();
    })    
    
    test('should navigate to "/marvel" if authenticated', () => {
        
        const contextValue =  {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Leo'
            }
        }
        
        const routesConfig = [
            {
                path: '/login',
                element: (
                    <PublicRoute>
                        <h1>Ruta pública</h1>
                    </PublicRoute>
                )
            },
            {
                path: '/marvel',
                element: (
                    <h1>Marvel Page</h1>
                )
            }
        ]

        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/login']
        })

        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
        )
        
        expect(screen.getByText('Marvel Page')).toBeTruthy()
    })    
})