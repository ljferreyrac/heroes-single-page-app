const { render, screen, fireEvent } = require("@testing-library/react");
const { AuthContext } = require("../../../src/auth");
const { Navbar } = require("../../../src/ui/components/NavBar");
const { MemoryRouter, useNavigate } = require("react-router-dom");

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en el <NavBar/>', () => { 
    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Juan'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());
    test('should show users name', () => { 
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Juan') ).toBeTruthy();
    });    
    
    test('should call logout and navigate functions when click on button', () => { 
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {
            replace: true
        });
    });    
})