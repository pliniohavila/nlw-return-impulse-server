import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        const submitFeedback = new SubmitFeedbackUseCase(
            { create: async () => {} },
            { sendMail: async () => {} }
        );

        await expect(submitFeedback.execute({
            type: 'IDEA', 
            comment: 'example comment',
            screenshot: 'datatest.jpg'
        })).resolves.not.toThrow();
    });
});