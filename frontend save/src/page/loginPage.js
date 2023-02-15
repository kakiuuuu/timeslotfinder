import useGoogle from "../hook/google"

const LoginPage = () => {
  const  handleLoginGoogle  = useGoogle();
  return <button onClick={handleLoginGoogle}>使用google登入</button>
}

export default LoginPage