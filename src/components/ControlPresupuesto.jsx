import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { formatearCantidad } from '../helpers'

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setValidPresupuesto}) => {
  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  useEffect(() => {
   const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total, 0);
   const totalDisponible = presupuesto - totalGastado
  //Calcular % gastado

  const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(1);

  setPorcentaje(nuevoPorcentaje);

   setDisponible(totalDisponible)
   setGastado(totalGastado)
  }, [gastos]);

  const handleReset = () => {
    const resultado = confirm('¿Quieres resetear todo el presupuesto?')
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setValidPresupuesto(false)
    }
  }
  
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
          <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#dc2626' : '#1352b9',
            textColor: porcentaje > 100 ? '#dc2626' : '#1352b9',

          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          >
          </CircularProgressbar>
      </div>
      <div className="contenido-presupuesto">
          <button
          className='reset-app'
          type='button'
          onClick={handleReset}
          >
            Resetear
          </button>
          <p>
              <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
          </p>
          <p className={`${disponible < 0 ? 'negativo' : ' '}`}>
              <span>Disponible: </span>{formatearCantidad(disponible)}
          </p>
          <p>
              <span>Gastado: </span>{formatearCantidad(gastado)}
          </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
