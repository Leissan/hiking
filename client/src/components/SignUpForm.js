import React, {useState} from "react";
import {Button, Error, Input, FormField, Label, Textarea} from "../styles";

function SignUpForm({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
                image_url: imageUrl,
                name: name,
                last_name: lastName,
                bio,
            }),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormField>
                <Label htmlFor="username">Username</Label>
                <Input
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label htmlFor="lastName">Name</Label>
                <Input
                    type="text"
                    id="lastName"
                    autoComplete="off"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
            </FormField>
            <FormField>
                <Label htmlFor="password">Password Confirmation</Label>
                <Input
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="current-password"
                />
            </FormField>
            <FormField>
                <Label htmlFor="imageUrl">Profile Image</Label>
                <Input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </FormField>
            <FormField>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    rows="3"
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </FormField>
            <FormField>
                <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
            </FormField>
            <FormField>
                {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                ))}
            </FormField>
        </form>
    );
}

export default SignUpForm;