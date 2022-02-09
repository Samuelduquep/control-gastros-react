import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setValidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if(!Number(presupuesto) ||Number(presupuesto)<0 ){
            setMensaje('No es un presupuesto válido')
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }

        setValidPresupuesto(true)
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form className='formulario' onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label htmlFor="presupuesto">Definir Presupuesto</label>
                    <input 
                    className='nuevo-presupuesto'
                    type="number" 
                    placeholder='Añade tu Presupuesto'
                    id='presupuesto'
                    value={presupuesto}
                    onChange={e => setPresupuesto(Number (e.target.value) )}
                    />
                </div>
                <input type="submit" value="Añadir" />
                {mensaje && <Mensaje tipo ="error">{mensaje}</Mensaje>}

            </form>
        </div>
    )

}

export default NuevoPresupuesto;
