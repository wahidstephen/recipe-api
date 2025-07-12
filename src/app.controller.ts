import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  // No root endpoint - should return 404 as expected by tests
}
