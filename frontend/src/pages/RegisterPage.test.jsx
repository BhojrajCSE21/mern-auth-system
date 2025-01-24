// FILE: frontend/src/pages/RegisterPage.test.jsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import RegisterPage from "./RegisterPage";

jest.mock("axios");

const mockLogin = jest.fn();

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>,
        renderOptions
    );
};

describe("RegisterPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders RegisterPage and handles form submission", async () => {
        const providerProps = {
            value: { login: mockLogin },
        };

        renderWithContext(
            <Router>
                <RegisterPage />
            </Router>,
            { providerProps }
        );

        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: "testuser@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "password123" },
        });

        axios.post.mockResolvedValueOnce({ data: { token: "fakeToken" } });

        fireEvent.click(screen.getByText(/register/i));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ token: "fakeToken" });
            expect(screen.getByText(/register/i)).toBeInTheDocument();
        });
    });

    test("displays error message on failed registration", async () => {
        const providerProps = {
            value: { login: mockLogin },
        };

        renderWithContext(
            <Router>
                <RegisterPage />
            </Router>,
            { providerProps }
        );

        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByPlaceholderText(/email/i), {
            target: { value: "testuser@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "password123" },
        });

        axios.post.mockRejectedValueOnce({
            response: { data: { message: "Registration failed" } },
        });

        fireEvent.click(screen.getByText(/register/i));

        await waitFor(() => {
            expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
        });
    });
});