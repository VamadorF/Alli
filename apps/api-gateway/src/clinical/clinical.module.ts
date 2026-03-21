import { Module } from "@nestjs/common"
import { CLINICAL_ASSESSMENT_PORT } from "../domain/ports/clinical-assessment.port"
import { ClinicalModelsAdapter } from "./adapters/clinical-models.adapter"
import { ClinicalController } from "./clinical.controller"
import { ClinicalService } from "./clinical.service"

@Module({
  controllers: [ClinicalController],
  providers: [
    ClinicalService,
    ClinicalModelsAdapter,
    {
      provide: CLINICAL_ASSESSMENT_PORT,
      useExisting: ClinicalModelsAdapter,
    },
  ],
})
export class ClinicalModule {}
