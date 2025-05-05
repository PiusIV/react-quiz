import logo from "../assets/react.svg";

function Header() {
  return (
    <header className="flex gap-6 justify-center text-3xl font-mini font-bold mb-8">
      <img src={logo} alt="React logo" className="" />
      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
