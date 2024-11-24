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
            nombre_usr: datos.nombre_usr,
            psw_usr: datos.psw_usr,
        };

        const parametros = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token'),
            },
            body: JSON.stringify(usuario),
        };

        const url = "http://localhost:8081/usuario/login/";

        try {
            const res = await fetch(url, parametros);
            const body = await res.json();

           /* if (res.ok) {
                sessionStorage.setItem('token', body.token);
                toast.success(`Bienvenido ${body.datos.nombre_usr}`, confToast);
                navigate("/landingpage");
            } else {
                toast.error(body.message, confToast);
            }
                */
            if (res.ok) {
                sessionStorage.setItem('token', body.token);
                sessionStorage.setItem('rol_usr', body.datos.rol_usr);
                toast.success(`Bienvenido ${body.datos.rol_usr}`, confToast);
                navigate("/landingpage");
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
                        type="nombre"
                        {...register('nombre_usr', { required: 'Se requiere un usuario para ingresar' })}
                    />
                    {errors.nom_usr && (
                        <div className="error_message">
                            {errors.nombre_usr.message}
                        </div>
                    )}
                </div>
                <div className="form_group">
                    <label className='label_login'>Contraseña</label>
                    <input
                        className='input_login'
                        type="password"
                        {...register('psw_usr', {
                            required: 'Contraseña es requerida',
                            minLength: { value: 4, message: 'Debe tener al menos 4 caracteres' },
                            maxLength: { value: 8, message: 'Debe tener máximo 8 caracteres' },
                        })}
                    />
                    {errors.psw_usr && (
                        <div className="error_message">
                            {errors.psw_usr.message}
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

