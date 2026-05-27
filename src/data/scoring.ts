import { ScoringLogic } from '../types';

export function calculateAttachmentResult(scores: Record<string, number>, totalQuestionsPerDim: Record<string, number>): ScoringLogic {
  const avoidance = (scores['avoidance'] || 0) / (totalQuestionsPerDim['avoidance'] || 1);
  const anxiety = (scores['anxiety'] || 0) / (totalQuestionsPerDim['anxiety'] || 1);

  const getLevel = (val: number) => val > 3.7 ? 'alto' : val > 2.5 ? 'mod' : 'bajo';
  const avL = getLevel(avoidance);
  const anL = getLevel(anxiety);

  const key = `${anL}-${avL}`; // anxiety-avoidance

  let primaryType = '';
  let explanation = '';
  let recommendations: string[] = [];

  switch (key) {
    case 'bajo-bajo':
      primaryType = 'Apego Seguro Sólido';
      explanation = 'Te sientes muy cómodo/a con la intimidad emocional y la independencia. Confías plenamente en tu pareja y comunicas tus necesidades de forma efectiva sin miedo al rechazo ni a la asfixia.';
      recommendations = [
        'Continúa cultivando la empatía y la comunicación abierta.',
        'Eres una base segura para tu pareja; tu estabilidad puede ayudar a sanar inseguridades en los demás.',
        'Mantén el equilibrio saludable entre tu autonomía personal y la vida en pareja.'
      ];
      break;
    case 'mod-bajo':
      primaryType = 'Apego Seguro con Rasgos Ansiosos';
      explanation = 'Generalmente tienes seguridad en tus relaciones, pero ocasionalmente experimentas dudas sobre tu valor o el compromiso de tu pareja. Buscas un poco más de validación de lo usual en un perfil totalmente seguro.';
      recommendations = [
        'Reconoce tus momentos de duda sin juzgarte; son normales.',
        'Comunica tus necesidades ocasionales de reafirmación de forma directa y calmada.',
        'Trabaja en fortalecer tu autoconfianza durante los momentos en que te sientas desconectado/a.'
      ];
      break;
    case 'alto-bajo':
      primaryType = 'Apego Ansioso (Preocupado) Fuerte';
      explanation = 'Tienes un intenso deseo de cercanía emocional y una gran sensibilidad a los signos de rechazo o abandono. Inviertes mucha energía en la relación y puedes llegar a depender de tu pareja para tu estabilidad emocional.';
      recommendations = [
        'Desarrolla fuentes de autoestima fuera de la relación (pasatiempos, amigos, metas).',
        'Aprende a diferenciar entre la ansiedad interna y las amenazas reales en la relación.',
        'Practica la autorregulación emocional cuando sientas el impulso de exigir atención.'
      ];
      break;
    case 'bajo-mod':
      primaryType = 'Apego Seguro con Rasgos Evitativos';
      explanation = 'Tienes una buena base de seguridad emocional, pero en ocasiones de alto estrés prefieres retirarte un poco y manejar las cosas por tu cuenta. Valoras tu espacio personal levemente más que el promedio.';
      recommendations = [
        'Sé consciente de tu tendencia a aislarte bajo presión y comunícalo a tu pareja.',
        'Intenta compartir tus preocupaciones en lugar de procesarlas en completa soledad.',
        'Asegúrate de que tu necesidad de espacio no sea interpretada como rechazo.'
      ];
      break;
    case 'mod-mod':
      primaryType = 'Apego Mixto (Transicional)';
      explanation = 'Muestras una combinación moderada de ansiedad y evitación. Dependiendo de la pareja, podrías reaccionar con miedo al rechazo o con necesidad de distanciamiento. Eres adaptable pero puedes sentir confusión emocional.';
      recommendations = [
        'Observa qué dinámicas (o parejas) detonan tu lado ansioso y cuáles tu lado evitativo.',
        'Esfuérzate por mantener el centro y no reaccionar impulsivamente ante estímulos mixtos.',
        'Considera llevar un diario para entender mejor tus propios patrones de apego fluctuantes.'
      ];
      break;
    case 'alto-mod':
      primaryType = 'Apego Ansioso con Tendencia Evitativa';
      explanation = 'Experimentas una fuerte ansiedad por el abandono, pero cuando las cosas se ponen difíciles o te sientes herido/a, puedes emplear estrategias evitativas (como alejarte en silencio) como mecanismo de defensa.';
      recommendations = [
        'Nota cuando el "castigo del silencio" o el distanciamiento provengan del dolor y no de una necesidad real de espacio.',
        'Atrévete a expresar tu vulnerabilidad y miedo, en lugar de ponerte una coraza repentina.',
        'Busca construir confianza gradual para no tener que huir emocionalmente.'
      ];
      break;
    case 'bajo-alto':
      primaryType = 'Apego Evitativo (Desdeñoso) Fuerte';
      explanation = 'Valoras tu extrema independencia y autosuficiencia. Evitas depender de otros o que dependan de ti. Puedes sentirte incómodo/a e invadido/a si una pareja demanda mucha conexión emocional profunda.';
      recommendations = [
        'Desafía tu creencia de que ser vulnerable es una debilidad.',
        'Intenta interesarte activamente por el mundo emocional de tu pareja.',
        'Abre pequeñas ventanas de intimidad compartiendo cosas que normalmente te guardarías.'
      ];
      break;
    case 'mod-alto':
      primaryType = 'Apego Evitativo con Inseguridad Subyacente';
      explanation = 'Mantienes una distancia emocional fuerte (evitación), pero secretamente experimentas dudas moderadas sobre tu capacidad para ser amado/a (ansiedad). Mantienes a las personas lejos por miedo, no solo por independencia fría.';
      recommendations = [
        'Reconoce que tu distanciamiento es, en parte, un escudo contra el posible rechazo.',
        'Intenta deconstruir lentamente tus muros emocionales con personas muy seguras.',
        'Busca relaciones estables que no te abrumen, pero que te inviten a salir de tu caparazón.'
      ];
      break;
    case 'alto-alto':
      primaryType = 'Apego Temeroso (Ansioso-Evitativo) Profundo';
      explanation = 'Sientes un fuerte conflicto interno: deseas desesperadamente amor y conexión, pero a la vez te aterra la cercanía emocional y la posibilidad de salir lastimado/a. Las relaciones suelen ser una fuente de angustia intensa para ti.';
      recommendations = [
        'Considera el apoyo psicológico profesional; sanar heridas profundas del pasado es fundamental.',
        'Trabaja en la autoaceptación y reconoce que mereces amor sin condiciones.',
        'Enfócate en dar pequeños pasos predecibles hacia la confianza, sin forzarte a la intimidad extrema de golpe.'
      ];
      break;
    default:
      primaryType = 'Perfil No Determinado';
      explanation = 'Los puntajes obtenidos están fuera del rango predecible.';
      recommendations = [];
      break;
  }

  return { primaryType, explanation, recommendations };
}

export function calculateLoveResult(scores: Record<string, number>, totalQuestionsPerDim: Record<string, number>): ScoringLogic {
  const iScore = (scores['Intimidad'] || 0) / (totalQuestionsPerDim['Intimidad'] || 1);
  const pScore = (scores['Pasión'] || 0) / (totalQuestionsPerDim['Pasión'] || 1);
  const cScore = (scores['Compromiso'] || 0) / (totalQuestionsPerDim['Compromiso'] || 1);

  const getLoveLevel = (val: number) => val >= 4.0 ? 'alto' : val >= 2.6 ? 'mod' : 'bajo';
  
  const i = getLoveLevel(iScore);
  const p = getLoveLevel(pScore);
  const c = getLoveLevel(cScore);

  const mKey = `${i}-${p}-${c}`;

  const matrix: Record<string, { t: string, e: string, r: string[] }> = {
    // 3 Altos
    'alto-alto-alto': { t: 'Amor Consumado Apasionado', e: 'Posees los tes pilares al máximo nivel. Es el amor pleno, intenso y duradero.', r: ['Mantén el cuidado de tu relación como prioridad.', 'Celebra esta inusual y maravillosa conexión.'] },
    // 3 Mods
    'mod-mod-mod': { t: 'Amor Consumado Equilibrado', e: 'Tienes un balance armónico y moderado en intimidad, pasión y compromiso.', r: ['Busca momentos para intensificar la pasión ocasionalmente.', 'Sigue alimentando la amistad de base.'] },
    // 3 Bajos
    'bajo-bajo-bajo': { t: 'Falta de Amor', e: 'Ausencia de intimidad, pasión y compromiso. Vínculo casual o distanciamiento.', r: ['Evalúa el propósito de esta relación.', 'Fomenta la comunicación para conocer mejor a la otra persona.'] },

    // 2 Altos, 1 Mod
    'alto-alto-mod': { t: 'Amor Romántico Fuerte (Transición)', e: 'Alta intimidad y pasión con un compromiso que se está desarrollando o es moderado.', r: ['No fuercen el compromiso; disfruten su conexión profunda.', 'Platiquen sobre el futuro cuando sientan que es el momento correcto.'] },
    'alto-mod-alto': { t: 'Amor Compañero Fuerte con Pasión Moderada', e: 'Compromiso sólido e intimidad inquebrantable, con niveles de pasión intermedios.', r: ['Intenten introducir novedades en su rutina íntima.', 'Valoren la inmensa seguridad que se tienen.'] },
    'mod-alto-alto': { t: 'Amor Fatuo Intenso con Intimidad Creciente', e: 'Decisión compartida y fuego intenso, la confianza emocional profunda está en construcción.', r: ['Aprovechen la pasión para conversar de temas más profundos.', 'Eviten tomar decisiones solo bajo la influencia de la adrenalina.'] },

    // 2 Altos, 1 Bajo
    'alto-alto-bajo': { t: 'Amor Romántico Puro', e: 'Conexión emocional profunda y deseo ardiente sin ataduras a un compromiso a largo plazo.', r: ['Disfruten el momento presente plenamente.', 'Estén atentos si uno de los dos comienza a querer mayor compromiso.'] },
    'alto-bajo-alto': { t: 'Amor Compañero Profundo', e: 'La pasión ha disminuido casi por completo, pero la amistad íntima y la lealtad sostienen un vínculo de hierro.', r: ['Inviertan en actividades que reconecten su atracción física.', 'Estén orgullosos de la lealtad que han forjado.'] },
    'bajo-alto-alto': { t: 'Amor Fatuo Ciego', e: 'Alta pasión y un firme compromiso tomados de forma repentina sin que exista una verdadera compatibilidad emocional íntima.', r: ['Tómense el tiempo para desnudarse emocionalmente, no solo físicamente.', 'Cuidado con aferrarse a la relación por puro deber.'] },

    // 1 Alto, 2 Mods
    'alto-mod-mod': { t: 'Cariño Profundo y Potencial Consumado', e: 'La intimidad ilumina la relación, mientras la pasión y el compromiso se mantienen en una vibración armónica pero moderada.', r: ['Usa la excelente comunicación mutua para explorar fantasías e intenciones.', 'Dejen crecer el compromiso orgánicamente.'] },
    'mod-alto-mod': { t: 'Encaprichamiento Fuerte con Bases Sólidas', e: 'Domina el deseo intenso y fogoso, respaldado por un nivel amistoso y comprometido suficiente para mantener el vínculo estable.', r: ['Trabajen en conocerse desde un aspecto más vulnerable.', 'Canalicen la pasión hacia proyectos o valores conjuntos.'] },
    'mod-mod-alto': { t: 'Compromiso Fuerte con Vínculo Equilibrado', e: 'La lealtad es la columna vertebral de la relación; la cercanía y el deseo existen, pero en un segundo plano pacífico.', r: ['Abran espacios en su agenda solo para conectar y divertirse.', 'Es válido ser un equipo pragmático, pero no olviden el romance mutuo.'] },

    // 1 Alto, 1 Mod, 1 Bajo
    'alto-mod-bajo': { t: 'Amistad Romántica', e: 'Total transparencia y cercanía con algo de chispa pasional, sin embargo carecen de un proyecto a futuro conjunto.', r: ['Acepten y honren la etapa de descubrimiento mutuo.', 'Pregúntense si realmente desean involucrarse más a fondo.'] },
    'alto-bajo-mod': { t: 'Cariño Leal', e: 'Te conectas desde la vulnerabilidad absoluta y un compromiso naciente, aunque el deseo físico está un poco frío.', r: ['Busquen espacios seguros para despertar la chispa y el contacto físico.', 'No descuiden al otro dando demasiado por sentada la amistad.'] },
    'mod-alto-bajo': { t: 'Pasión con Conexión', e: 'El deseo arrollador es la estrella, apoyado por una camaradería moderada, pero sin visos de ataduras o futuros a largo plazo.', r: ['Diviértanse en la conexión vibrante.', 'Hablen con claridad si uno espera un futuro en serio.'] },
    'bajo-alto-mod': { t: 'Atracción Comprometida', e: 'Alta química y un deber tibio hacia la relación, donde nadie parece querer abrir su corazón completamente para generar intimidad.', r: ['El miedo podría bloquear su vulnerabilidad emocional; atrévanse a contar un secreto.', 'El compromiso sin confianza es frágil frente a crisis.'] },
    'mod-bajo-alto': { t: 'Amor Práctico Sostenido', e: 'Firmeza en la unión con un cariño que los acompaña, pero carente de emoción fogosa o pasional.', r: ['Una escapada sorpresa podría despertar las mariposas que faltan.', 'Celebren la fortaleza de sus valores compartidos.'] },
    'bajo-mod-alto': { t: 'Deber con Ligera Atracción', e: 'Se juraron lealtad eterna y hay algunos destellos de atracción física, pero viven desconectados en su interior.', r: ['Terapia de pareja podría reactivar los canales de diálogo bloqueados.', 'Pregúntense qué cosas evitaron decirse por años.'] },

    // 1 Alto, 2 Bajos
    'alto-bajo-bajo': { t: 'Amistad Íntima', e: 'Únicamente hay un pilar: logras conectar tus sentimientos más puros, pareciendo grandes hermanos o el mejor de los amigos.', r: ['Excelente para amistades; confuso si buscan un romance.', 'Aclaren qué siente él/ella y no crucen líneas si no quieren algo más.'] },
    'bajo-alto-bajo': { t: 'Encaprichamiento Puro (Pasión Fugaz)', e: 'Llama violenta de deseo físico que carece tanto de anclaje mental como emocional; química en estado bruto.', r: ['Vivan la intensidad sabiendo que es algo efímero si no lo trabajan.', 'Observen si luego de la pasión queda algún tipo de afinidad.'] },
    'bajo-bajo-alto': { t: 'Amor Vacío Total', e: 'Permanece la relación únicamente por inercia, convención social o beneficios mutuos prácticos, sin fuego ni amistad íntima.', r: ['Plantean si esta forma de vivir les llena el alma de verdad.', 'Reinventen las reglas de su hogar; sean compañeros, no solo inquilinos.'] },

    // 0 Altos, 2 Mod, 1 Bajo
    'mod-mod-bajo': { t: 'Romance Ligero', e: 'Simpatía y atracción a nivel moderado, ideal para amores de verano o vínculos incipientes.', r: ['Relájense y dejen que el vínculo tome naturalmente la forma que deba tomar.', 'Disfruten de no tener las presiones de compromisos pesados.'] },
    'mod-bajo-mod': { t: 'Compañerismo Suave', e: 'Son algo amigos y tienen intenciones de seguir viéndose o mantener una relación, pero es de marcha lenta, sin euforia.', r: ['Es un vínculo noble; evalúa si aporta suficiente alegría a tu vida.', 'Podrían beneficiarse de proyectos en común.'] },
    'bajo-mod-mod': { t: 'Amor Fatuo Moderado', e: 'Eligen ser pareja y mantienen cierta mecha de pasión encendida, pero con barreras para sincerar el corazón.', r: ['Comuniquen sus inseguridades sin atacar al otro.', 'Si abren los sentimientos sinceros, el vínculo podría despegar.'] },

    // 0 Altos, 1 Mod, 2 Bajos
    'mod-bajo-bajo': { t: 'Cariño Moderado (Conocidos)', e: 'Cierto grado de simpatía mutua, con potencial para ser amistad pero lejos del terreno romántico.', r: ['Trata la relación como un proceso para conocer un ser humano.', 'A veces el amor crece lento partiendo de chispazos de empatía.'] },
    'bajo-mod-bajo': { t: 'Atracción Leve', e: 'Sentimientos incipientes de gusto, no determinantes y sin formalidad alguna.', r: ['No apures nada; que todo fluya si deciden avanzar.', 'Ideal si prefieres evitar complicaciones en tu presente.'] },
    'bajo-bajo-mod': { t: 'Compromiso Tibio', e: 'Están juntos por obligación muy ligera o conveniencia blanda, con nula conexión en los otros frentes.', r: ['Sean sinceros si permanecen por miedo a la soledad.', 'Un cariño de acompañamiento moderado, reevalúen sus expectativas.'] }
  };

  const logic = matrix[mKey] || {
    t: 'Perfil en Evaluación',
    e: 'Tus respuestas representan un perfil mixturado inusual.',
    r: ['Consulta de nuevo tu estado emocional en unas semanas.']
  };

  return { primaryType: logic.t, explanation: logic.e, recommendations: logic.r };
}
