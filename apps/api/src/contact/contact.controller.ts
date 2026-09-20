import { Body, Controller, Post } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactMessageDto } from "./dto/create-contact-message.dto";

@Controller("contact-messages")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  send(@Body() input: CreateContactMessageDto) {
    return this.contactService.send(input);
  }
}
