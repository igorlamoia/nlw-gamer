import * as yup from 'yup';

export const createAdSchema = yup.object().shape({
	game: yup.string().required('Game é obrigatório!'),
	name: yup.string().required('Nickname é obrigatório'),
	yearsPlaying: yup
		.number()
		.typeError('É necessário informar um número para anos jogando')
		.required('Anos de experiência é obrigatório! (mesmo que seja ZERO)'),
	discord: yup.string().required('Discord é obrigatório!'),
	weekDays: yup.array().min(1, 'Selecione pelo menos 1 dias da semana'),
	hourStart: yup
		.string()
		.matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Horário inválido')
		.required(),
	hourEnd: yup
		.string()
		.matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Horário inválido')
		.required(),
});
