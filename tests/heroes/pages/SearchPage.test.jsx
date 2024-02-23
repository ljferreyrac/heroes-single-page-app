import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Pruebas en <SearchPage/>', () => {
    
    beforeEach(() => jest.clearAllMocks());
    
    test('should show correctly with default values', () => { 
       const {container} = render(
        <MemoryRouter>
            <SearchPage/>
        </MemoryRouter>
       );
       expect( container ).toMatchSnapshot();
    });    
    
    test('should show Batman and input should show querys value', () => { 
       render(
        <MemoryRouter initialEntries={['/search?q=batman']}>
            <SearchPage/>
        </MemoryRouter>
       );
       const input = screen.getByRole('textbox');
       const img = screen.getByRole('img');
       const alert = screen.getByLabelText('alert-danger');
       expect( input.value ).toBe('batman')
       expect( img.src ).toContain('/assets/heroes/dc-batman.jpg')
       expect( alert.style.display ).toBe("none");
    });

    test('should show error if hero is not found', () => { 
       render(
        <MemoryRouter initialEntries={['/search?q=batman123']}>
            <SearchPage/>
        </MemoryRouter>
       );

       const alert = screen.getByLabelText('alert-danger');

       expect( alert.style.display ).toBe("");
    });   

    test('should call navigate to new screen', () => { 
       render(
        <MemoryRouter initialEntries={['/search']}>
            <SearchPage/>
        </MemoryRouter>
       );
       const input = screen.getByRole('textbox');
       fireEvent.change(input, {target: {name: 'searchText', value: 'superman'}})
       const form = screen.getByRole('form');
       fireEvent.submit(form);
       expect(mockUseNavigate).toHaveBeenCalledWith('?q=superman');
    });    
})