import { Model, Document, QueryFindOneAndUpdateOptions } from 'mongoose'
import { IPagination } from '../base.interface'

export abstract class BaseService<T extends Document> {
  NOT_FOUND_ERROR = 'Record does not exists'
  constructor(protected readonly model: Model<T, {}>) {}

  async updateMany(
    conditions: object,
    doc: object,
    options: object,
  ): Promise<T[]> {
    return this.model.updateMany(conditions, doc, options)
  }

  async findOneAndUpdate(
    conditions: object,
    doc: object,
    options: QueryFindOneAndUpdateOptions,
  ): Promise<T> {
    return this.model.findOneAndUpdate(conditions, doc, options)
  }

  async findByIdAndUpdate(
    id: string,
    doc: object,
    options?: QueryFindOneAndUpdateOptions,
  ): Promise<T> {
    return this.model.findByIdAndUpdate(id, doc, options)
  }

  async countDocuments(criteria: object) {
    return this.model.countDocuments(criteria)
  }

  async find(conditions?: object): Promise<T[]> {
    conditions = conditions ?? {}
    return this.model.find(conditions)
  }

  async findOne(conditions: object): Promise<T> {
    return this.model.findOne(conditions)
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id)
  }

  async delete(conditions: object): Promise<boolean> {
    const result = await this.model.deleteOne(conditions)
    return result.ok === 1 ? true : false
  }

  async deleteMany(conditions: object): Promise<boolean> {
    const result = await this.model.deleteMany(conditions)
    return result.ok === 1 ? true : false
  }

  async pagination({
    query,
    limit,
    skip,
    sort,
  }: {
    query?: object
    limit: number
    skip: number
    sort?: { [key: string]: any }
  }): Promise<IPagination<T>> {
    const results = await this.model
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
    const total = await this.model.countDocuments()
    return {
      total,
      hasNext: results.length < total,
      results,
    } as IPagination<T>
  }
}
