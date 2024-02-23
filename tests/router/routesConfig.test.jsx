import { render, screen } from "@testing-library/react";
import { AuthContext, LoginPage } from "../../src/auth";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { HeroesApp } from "../../src/HeroesApp";
import { MarvelPage } from "../../src/heroes/pages/MarvelPage";
import { PublicRoute } from "../../src/router/PublicRoute";

describe('Pruebas en routesConfig', () => { 
    test('should show login if not authenticated', () => { 
        
        const contextValue = {
            logged: false,
        }

        const routes = [
            {
                path:"/",
                element: 
                <PrivateRoute>
                  <HeroesApp/>
                </PrivateRoute>,
                children: [
                  {
                    path:"/marvel",
                    element: <MarvelPage/>
                  }
                ]
            },
            {
                path:"/login",
                element:
                <PublicRoute>
                  <LoginPage/>
                </PublicRoute> 
              },
        ]
        const router = createMemoryRouter(routes, {
            initialEntries:['/marvel']
        })
        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
       )

       expect( screen.getAllByText('Login').length ).toBe(2);
    });  
    test('should show marvel page if authenticated', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Leonardo'
            }
        }

        const routes = [
            {
                path:"/",
                element: 
                <PrivateRoute>
                  <HeroesApp/>
                </PrivateRoute>,
                children: [
                  {
                    path:"/marvel",
                    element: <MarvelPage/>
                  }
                ]
            },
            {
                path:"/login",
                element:
                <PublicRoute>
                  <LoginPage/>
                </PublicRoute> 
              },
        ]
        const router = createMemoryRouter(routes, {
            initialEntries:['/login']
        })
        render(
            <AuthContext.Provider value={contextValue}>
                <RouterProvider router={router}/>
            </AuthContext.Provider>
       )

       expect(screen.getByText('MarvelPage')).toBeTruthy();
    });  
})