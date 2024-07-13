import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Report } from '@withEntity/report/report.entity';

import { AuthService } from '@modules/auth/auth.service';

import { CreateReportDto } from '@withEntity/report/dto/createReport.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly authService: AuthService,
  ) {}

  async findAllReportsIDs() {
    const reportIDsObjects = await this.reportRepository
      .createQueryBuilder('report')
      .select('report.reportID', 'reportID')
      .getRawMany();

    return reportIDsObjects.map((report) => report.reportID);
  }

  generateReportID(allReportIDs: number[]): number {
    return allReportIDs.length ? Math.max(...allReportIDs) + 1 : 1;
  }

  async create(userID: string, createReportDto: CreateReportDto) {
    const { eventDescription, date } = createReportDto;
    let reportID: undefined | number = createReportDto?.reportID;
    const allReportIDs: number[] = await this.findAllReportsIDs();

    if (reportID && allReportIDs.includes(reportID))
      throw new BadRequestException('reportID is not correct');
    if (!reportID) reportID = this.generateReportID(allReportIDs);

    const newReport = {
      reportID,
      eventDescription,
      date,
      userInitiatorID: userID,
    };

    return await this.reportRepository.save(newReport);
  }

  async getByUserID(token: string) {
    const userID = this.authService.getTokenData(token);

    return await this.reportRepository.find({
      where: { userInitiatorID: userID },
    });
  }

  async removeByIDs(reportIDs: string) {
    const IDsArr: number[] = reportIDs.split('|').map((id) => Number(id));

    return await this.reportRepository.delete({ reportID: In(IDsArr) });
  }

  async removeAll() {
    return await this.reportRepository.delete({});
  }
}
