import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza a pagina de login", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /acessar pagina principal/i })
  ).toBeInTheDocument();
});
