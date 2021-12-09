import { render, screen, cleanup } from '@testing-library/react'
import App from './App'
import BookIndex from './components/BookIndex'
import Jdata from "./data/akutagawa.json"

afterEach( () => {
    cleanup()
})

// test('Should render list of winners via WinList component.', () => {
//     interface Author {
//         
//         year: string;
//         name: string;
//         title: string;
    //      magazine: string;
//     }
//     let data: Array<Author> = Jdata

//     render(<WinnerIndex data={data} l={data.length} />);
//     const winListElement = screen.getByTestId('WinnerList');
//     expect(winListElement).toBeInTheDocument()
// })

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
