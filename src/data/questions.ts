import { Question } from '../types';

const agreeScale = [
  { text: 'Totalmente en desacuerdo', value: 1 },
  { text: 'En desacuerdo', value: 2 },
  { text: 'Neutral', value: 3 },
  { text: 'De acuerdo', value: 4 },
  { text: 'Totalmente de acuerdo', value: 5 },
];

export const attachmentQuestions: Question[] = [
  { id: 'a1', quizType: 'attachment', dimension: 'avoidance', text: 'Me resulta fácil acercarme emocionalmente a los demás.', options: [...agreeScale].map(o => ({ ...o, value: 6 - o.value })) },
  { id: 'a2', quizType: 'attachment', dimension: 'avoidance', text: 'Me incomoda depender de otras personas o que dependan de mí.', options: agreeScale },
  { id: 'a3', quizType: 'attachment', dimension: 'anxiety', text: 'A menudo me preocupa que mis parejas no me quieran realmente.', options: agreeScale },
  { id: 'a4', quizType: 'attachment', dimension: 'anxiety', text: 'Suelo pensar que mi pareja no querrá quedarse conmigo a largo plazo.', options: agreeScale },
  { id: 'a5', quizType: 'attachment', dimension: 'avoidance', text: 'Me siento cómodo/a sin establecer relaciones emocionales demasiado cercanas.', options: agreeScale },
  { id: 'a6', quizType: 'attachment', dimension: 'anxiety', text: 'A veces deseo fusionarme completamente con mi pareja y eso asusta a las personas.', options: agreeScale },
  { id: 'a7', quizType: 'attachment', dimension: 'avoidance', text: 'Me pongo nervioso/a cuando alguien se acerca demasiado emocionalmente.', options: agreeScale },
  { id: 'a8', quizType: 'attachment', dimension: 'anxiety', text: 'Me preocupa constantemente no ser lo suficientemente bueno/a para mi pareja.', options: agreeScale },
  { id: 'a9', quizType: 'attachment', dimension: 'avoidance', text: 'Prefiero no mostrar a los demás mis sentimientos más profundos.', options: agreeScale },
  { id: 'a10', quizType: 'attachment', dimension: 'anxiety', text: 'Necesito mucha reafirmación de que soy amado/a y valioso/a.', options: agreeScale },
];

export const loveQuestions: Question[] = [
  { id: 'l1', quizType: 'love', dimension: 'Intimidad', text: 'Siento que realmente comprendo a mi pareja y ella a mí.', options: agreeScale },
  { id: 'l2', quizType: 'love', dimension: 'Intimidad', text: 'Me resulta fácil compartir mis pensamientos y sentimientos más profundos con mi pareja.', options: agreeScale },
  { id: 'l3', quizType: 'love', dimension: 'Intimidad', text: 'Recibo un apoyo emocional incondicional por parte de mi pareja.', options: agreeScale },
  { id: 'l4', quizType: 'love', dimension: 'Pasión', text: 'Siento una fuerte y constante atracción física hacia mi pareja.', options: agreeScale },
  { id: 'l5', quizType: 'love', dimension: 'Pasión', text: 'Pienso en mi pareja frecuentemente a lo largo del día con intenso deseo romántico.', options: agreeScale },
  { id: 'l6', quizType: 'love', dimension: 'Pasión', text: 'Considero que nuestra relación es muy apasionada y vibrante.', options: agreeScale },
  { id: 'l7', quizType: 'love', dimension: 'Compromiso', text: 'Tengo la firme decisión de mantener esta relación a largo plazo, cueste lo que cueste.', options: agreeScale },
  { id: 'l8', quizType: 'love', dimension: 'Compromiso', text: 'Siento un profundo sentido de responsabilidad y lealtad hacia mi pareja.', options: agreeScale },
  { id: 'l9', quizType: 'love', dimension: 'Compromiso', text: 'No puedo imaginar mi vida en el futuro sin estar con mi pareja actual.', options: agreeScale },
];
