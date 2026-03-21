import { Body, Controller, Post } from "@nestjs/common"
import { ClinicalService } from "./clinical.service"

@Controller("clinical")
export class ClinicalController {
  constructor(private readonly clinical: ClinicalService) {}

  @Post("triage")
  triage(@Body() body: { nrs: number; redFlags?: boolean; phq2Total?: number; unstableVitals?: boolean }) {
    return this.clinical.triage(body)
  }
}
