import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import "../css/login.css";// Archivo CSS actualizado



export default function Login() {
    const navigate = useNavigate();

    const confToast = {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (datos) => {
        const usuario = {
            mail: datos.mail,
            pass: datos.pass,
        };

        const parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token'),
            },
            body: JSON.stringify(usuario),
        };

        const url = "http://localhost:5173/usuario/login";

        try {
            const res = await fetch(url, parametros);
            const body = await res.json();

            if (res.ok) {
                sessionStorage.setItem('token', body.token);
                toast.success(`Bienvenido ${body.datos.nombre}`, confToast);
                navigate("/vehiculos");
            } else {
                toast.error(body.message, confToast);
            }
        } catch (error) {
            toast.error(error.message, confToast);
        }
    };

    return (
        <section className='section_login'>
            <h1 className='titulo_login'>SISTEMA GESTIÓN DE CALIFICACIONES</h1>
            <h2 className='subtitulo_login'>Ingresa a tu cuenta</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="container_login">
                <div className="form_group">
                    <label className='label_login'>Nombre de Usuario</label>
                    <input
                        className='input_login'
                        type="email"
                        {...register('mail', { required: 'Se requiere un usuario para ingresar' })}
                    />
                    {errors.mail && (
                        <div className="error_message">
                            {errors.mail.message}
                        </div>
                    )}
                </div>
                <div className="form_group">
                    <label className='label_login'>Contraseña</label>
                    <input
                        className='input_login'
                        type="password"
                        {...register('pass', {
                            required: 'Contraseña es requerida',
                            minLength: { value: 8, message: 'Debe tener al menos 8 caracteres' },
                            maxLength: { value: 16, message: 'Debe tener máximo 16 caracteres' },
                        })}
                    />
                    {errors.pass && (
                        <div className="error_message">
                            {errors.pass.message}
                        </div>
                    )}
                </div>
                <div className="div_btn">
                    <button className='btn_login' type="submit">
                        INGRESAR
                    </button>
                </div>
                <div className="links">
                    <a href="/CrearCuenta">Crear una cuenta</a> |
                    <a href="/recuperar-contraseña">¿Olvidaste tu contraseña?</a>
                </div>
            </form>
        </section>
    );
}

