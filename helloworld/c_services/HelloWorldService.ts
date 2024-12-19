
import { HelloWorldValidationType } from "../b_validations/HelloWorldValidation";
import { StandardResponse } from "../f_utils/StandardResponse"

export class HelloWorldService {

    private t: (key: string) => string;
    constructor(t: (key: string) => string) {
        this.t = t;
    }

    async execute(
        validatedData: HelloWorldValidationType
    ): Promise<StandardResponse> {

        return {
            "status": 'success',
            "code": 200,
            "message": `${validatedData.message}`,
            "links": {
                "self": '/helloworld/helloworld',
            }
        }

    }
}