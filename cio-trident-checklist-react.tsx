import React, { useState, useEffect } from 'react';

const CIOTridentChecklist = () => {
  const [hasReadPolicy, setHasReadPolicy] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const questions = {
    firstPart: [
      "¿La herramienta implementa controles de acceso robustos?",
      "¿Utiliza métodos de autenticación seguros (por ejemplo, autenticación de dos factores)?",
      "¿Emplea técnicas de cifrado para proteger los datos en reposo y en tránsito?",
      "¿Tiene un sistema de gestión de permisos granular?",
      "¿Mantiene registros de auditoría de accesos y cambios?",
      "¿Cumple con las regulaciones de privacidad pertinentes (por ejemplo, GDPR, CCPA)?",
      "¿La aplicación permite a los usuarios controlar quién puede ver su información personal?",
      "¿Existen opciones para limitar la visibilidad de la información ingresada por los usuarios?",
      "¿Se ofrecen herramientas para reportar problemas de privacidad o uso indebido de la información?"
    ],
    secondPart: [
      "¿Implementa mecanismos de detección de alteraciones (por ejemplo, hashes, checksums)?",
      "¿Utiliza firmas digitales para verificar la autenticidad de los datos?",
      "¿Tiene controles para prevenir modificaciones no autorizadas?",
      "¿Mantiene un historial de cambios o sistema de versiones?",
      "¿Implementa validación de entrada para prevenir la corrupción de datos?",
      "¿Tiene mecanismos de respaldo y recuperación para restaurar datos en caso de corrupción?",
      "¿La aplicación verifica la autenticidad de las cuentas de usuarios o entidades importantes?",
      "¿Existe un sistema para detectar y prevenir la entrada de información falsa o engañosa?",
      "¿Se implementan medidas para prevenir la manipulación de métricas o interacciones de usuarios?"
    ],
    thirdPart: [
      "¿Tiene un plan de mantenimiento regular del hardware y software?",
      "¿Implementa sistemas de redundancia o alta disponibilidad?",
      "¿Tiene un plan de recuperación ante desastres documentado y probado?",
      "¿Realiza copias de seguridad regulares y las prueba?",
      "¿Monitorea el rendimiento y la capacidad del sistema?",
      "¿Tiene acuerdos de nivel de servicio (SLA) definidos y los cumple?",
      "¿La aplicación puede manejar picos de tráfico o uso intensivo sin degradación significativa?",
      "¿Existen medidas para prevenir o mitigar ataques que puedan afectar la disponibilidad del servicio?",
      "¿Se ofrecen opciones para acceder o utilizar la información en condiciones de conectividad limitada?"
    ],
    generalEvaluation: [
      "¿La herramienta cumple con los estándares de seguridad de la industria relevantes?",
      "¿Se realizan auditorías de seguridad periódicas?",
      "¿Existe un proceso para manejar y responder a incidentes de seguridad?",
      "¿Se proporciona capacitación a los usuarios sobre las mejores prácticas de seguridad?",
      "¿La aplicación tiene una política clara sobre el uso de los datos de los usuarios?",
      "¿Se ofrecen controles de acceso basados en roles o perfiles de usuario?",
      "¿Existe un proceso transparente para manejar solicitudes de acceso a datos por parte de terceros?"
    ]
  };

  useEffect(() => {
    if (showResults) {
      setTotalScore(calculateScore());
    }
  }, [showResults]);

  const handlePolicyRead = (read) => {
    setHasReadPolicy(read);
  };

  const handleAnswer = (section, index, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [`${section}-${index}`]: answer
    }));
  };

  const calculateScore = () => {
    let score = 0;
    Object.entries(questions).forEach(([section, sectionQuestions]) => {
      sectionQuestions.forEach((_, index) => {
        if (answers[`${section}-${index}`] === true) {
          score += index < sectionQuestions.length - 3 ? 1 : 0.5;
        }
      });
    });
    return Math.round((score / (Object.keys(questions).length * 7.5)) * 100);
  };

  const getBackgroundColor = () => {
    if (totalScore <= 50) return '#FFCCCB';
    if (totalScore <= 79) return '#FFFFA1';
    return '#90EE90';
  };

  const getResultExplanation = () => {
    if (totalScore <= 50) {
      return "Estado Alarmante: La aplicación muestra serias deficiencias en el manejo de la información. Se recomienda buscar alternativas adicionales.";
    } else if (totalScore <= 79) {
      return "Necesita Mejoras: La aplicación tiene aspectos que mejorar. Es importante documentar estas áreas y trabajar en ellas.";
    } else {
      return "Altos Estándares: La aplicación cumple con altos estándares de manejo de información.";
    }
  };

  const renderQuestionSection = (title, sectionQuestions, sectionKey) => (
    <div key={sectionKey} className="mb-6">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      {sectionQuestions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="mb-2">{question}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => handleAnswer(sectionKey, index, true)}
              className={`px-4 py-2 rounded ${answers[`${sectionKey}-${index}`] === true ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            >
              Sí
            </button>
            <button
              onClick={() => handleAnswer(sectionKey, index, false)}
              className={`px-4 py-2 rounded ${answers[`${sectionKey}-${index}`] === false ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            >
              No
            </button>
            <button
              onClick={() => handleAnswer(sectionKey, index, null)}
              className={`px-4 py-2 rounded ${answers[`${sectionKey}-${index}`] === null ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            >
              No lo sé
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6" style={{ backgroundColor: showResults ? getBackgroundColor() : 'white' }}>
      <h1 className="text-2xl font-bold mb-6">Herramienta Interactiva de Evaluación del Manejo Seguro y Responsable de los Datos</h1>

      {hasReadPolicy === null ? (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Preparación Inicial</h2>
          <p className="mb-2">¿Ha leído usted la política de privacidad y seguridad de la herramienta que va a evaluar?</p>
          <div className="flex space-x-4">
            <button
              onClick={() => handlePolicyRead(true)}
              className="px-4 py-2 rounded bg-green-500 text-white"
            >
              Sí
            </button>
            <button
              onClick={() => handlePolicyRead(false)}
              className="px-4 py-2 rounded bg-red-500 text-white"
            >
              No
            </button>
          </div>
        </div>
      ) : hasReadPolicy ? (
        <>
          {renderQuestionSection("Primera Parte", questions.firstPart, "firstPart")}
          {renderQuestionSection("Segunda Parte", questions.secondPart, "secondPart")}
          {renderQuestionSection("Tercera Parte", questions.thirdPart, "thirdPart")}
          {renderQuestionSection("Evaluación General", questions.generalEvaluation, "generalEvaluation")}

          <button
            onClick={() => setShowResults(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver Resultados
          </button>

          {showResults && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-3">Resultados</h2>
              <p>Calificación Total: {totalScore}/100</p>
              <p className="font-bold mt-2">{getResultExplanation()}</p>

              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Importancia de las secciones:</h3>
                <ul className="list-disc list-inside">
                  <li><strong>Primera Parte (Confidencialidad):</strong> Asegura que la información solo sea accesible para aquellos autorizados.</li>
                  <li><strong>Segunda Parte (Integridad):</strong> Garantiza que la información se mantenga precisa y completa.</li>
                  <li><strong>Tercera Parte (Disponibilidad):</strong> Asegura que la información esté accesible cuando se necesite.</li>
                  <li><strong>Evaluación General:</strong> Considera aspectos generales de seguridad complementarios.</li>
                </ul>
                <p className="mt-2">Esta estructura corresponde al Tridente CIO (Confidencialidad, Integridad, Disponibilidad), fundamental para la seguridad de la información.</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-red-500 mt-2">
          Por favor, lea la documentación relevante antes de proceder con esta evaluación.
        </p>
      )}
    </div>
  );
};

export default CIOTridentChecklist;
