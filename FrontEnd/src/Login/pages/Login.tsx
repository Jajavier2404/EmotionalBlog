import Button from "../components/button"
export default function Home() {
return (
    <div className="home">
        <Button label="Login" onClick={() => alert("Login Clicked")} />
        <h1>Welcome to EmotionalBlog</h1>
        <p>esto es login .</p>
    </div>
  )
}