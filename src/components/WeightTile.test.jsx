import WeightTile from "./WeightTile";
import { render, screen, waitForElementToBeRemoved, within, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw";
import { setupServer } from "msw/node";
import { expect, afterEach } from "vitest";
import "@testing-library/jest-dom";

beforeEach(() => {
  fetch.resetMocks()
})
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close())

const mockWeight = [
  {
    id: 1,
    kg: 45,
    created_at: "2023-06-05"
  },
  {
    id: 2,
    kg: 47,
    created_at: "2023-06-09"
  }
]

it('should render the weight as 47', () => {
  render(<WeightTile weight={{kg: 47}} weightDifference={[47, 43]}/>)
  const weight = screen.getByText('47kg')
  expect(weight).toBeInTheDocument()
  const weightDifference = screen.getByText('4kg left to target')
  expect(weightDifference).toBeInTheDocument()
})

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

// const server = setupServer(
//   rest.all(`${SUPABASE_URL}/weight`, async (req, res, ctx) => {
//     switch (req.method) {
//       case "GET":
//         return res(ctx.json(mockWeight));
//       default:
//         return res(ctx.json("Unhandled method"));
//     }
//   })
// )

// it('should display the most recent weight on db request', async() => {
//   render(<WeightTile/>)
//    await waitFor(() => {
//     expect(fetch.requests().length).toEqual(1)
//     expect(screen.findByText(47)).toBeInTheDocument()
//     expect(screen.findByText(45)).not.toBeInTheDocument()
//   })
// })