export default function Presicion() {
    return (
        <div className="bg-white md:w-10/12 w-full p-8 rounded-none md:rounded-xl shadow-none md:shadow-lg relative z-20">
            <h1 className="text-2xl md:text-4xl font-extrabold text-center  w-full mb-2 mt-4 font-subtitulo">Precisión de nuestra IA</h1>
            <p className="text-lg font-light text-center">Valores que se actualizan día a día con el avance del desarrollo de nuestra IA</p>
            <div className="flex flex-col md:flex-row gap-6 mt-10">

                
                <div className="flex flex-col border-b-4 border-b-third justify-center items-center w-full bg-white shadow-lg  rounded-xl rounded-b-none">
                    <h2 className="text-2xl md:text-4xl font-bold text-center mb-3">96%</h2>
                    <p className="text-md md:text-lg font-subtitulo font-medium text-center px-6 mb-6">Porcentaje de precisión en el diagnóstico de restricción</p>
                </div>
                <div className="flex flex-col border-b-4 border-b-third justify-center items-center w-full bg-white shadow-lg  rounded-xl rounded-b-none">
                    <h2 className="text-2xl md:text-4xl font-bold text-center mb-3">88%</h2>
                    <p className="text-md md:text-lg font-subtitulo font-medium text-center px-6 mb-6">Porcentaje de precisión en el diagnóstico de obstrucción</p>
                </div>

            </div>
           
            {/* <p>En DEIA, nos comprometemos a mejorar la salud respiratoria de las personas a través de la innovación y la investigación. Nuestro objetivo es ayudar a las comunidades mediante el desarrollo y la implementación de diagnósticos de espirometrías basados en inteligencia artificial. Creemos que la tecnología puede transformar la atención médica, permitiendo diagnósticos más precisos y accesibles para todos. Nos dedicamos a seguir investigando y avanzando en este campo, para que cada persona tenga acceso a una mejor calidad de vida.</p> */}
        </div>
    )
}