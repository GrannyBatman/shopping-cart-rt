import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { Home, About, Store } from './pages'

function App() {
	return (
		<ShoppingCartProvider>
			<Navbar />
			<Container className="mb-4">
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/store" element={<Store />}></Route>
					<Route path="/about" element={<About />}></Route>
				</Routes>
			</Container>
		</ShoppingCartProvider>
	)
}

export default App
