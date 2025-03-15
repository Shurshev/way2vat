import { ExpensesModel } from '../datastore/ExpenceModel';
import { Summary } from '../types';

class SummaryRepository {
  async getSummary(): Promise<Summary | null> {
    const [result] = await ExpensesModel.aggregate<Summary>([
      {
        $facet: {
          statusCounts: [{ $group: { _id: "$status", count: { $sum: 1 } } }],
          totalReports: [{ $group: { _id: "$reportId" } }, { $count: "count" }],
        },
      },
      {
        $project: {
          statusCounts: 1,
          totalReports: { $arrayElemAt: ["$totalReports.count", 0] },
        },
      },
    ]);

    return result || null;
  }
}

class SummaryController {
  private summaryRepository: SummaryRepository;

  constructor() {
    this.summaryRepository = new SummaryRepository();
  }

  async getSummary(): Promise<Summary | null> {
    return await this.summaryRepository.getSummary();
  }
}

export const summaryController = new SummaryController();
