import { Repository, EntityRepository } from 'typeorm'
import { Setting } from '../../domain/entities/Settings'

@EntityRepository(Setting)
export class SettingsRepository extends Repository<Setting> {}
