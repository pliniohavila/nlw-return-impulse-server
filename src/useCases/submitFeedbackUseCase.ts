import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepositories } from "../repositories/feedbacksRepositories";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    
    constructor(
        private feedbacksRepository: FeedbacksRepositories,
        private mailAdapter: MailAdapter,
    ) {
        this.feedbacksRepository = feedbacksRepository
    }

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request;

        if(!type) {
            throw new Error('Type is required.');
        }

        if(!comment) {
            throw new Error('Type is required.');
        }

        if (screenshot && !screenshot.startsWith('data')) {
            throw new Error('Not Image');
        }

        await this.feedbacksRepository.create({
            type, 
            comment, 
            screenshot, 
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : '',
                `</div>`
            ].join('\n')
        });
    }
}