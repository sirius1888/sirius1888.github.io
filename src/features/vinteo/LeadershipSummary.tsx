import { bi, localize, type Language } from '../../i18n';

import { ClipboardList, Code2, TestTube2, Users } from 'lucide-react';
/** Team composition and development practices introduced at Vinteo. */
export function LeadershipSummary({ lang }: { lang: Language }) {
  const t = localize(lang);

  return (
    <div className="leadership-layout" data-reveal>
      <div className="leadership-intro">
        <span className="case-kicker">{t('MY RESPONSIBILITIES', 'МОИ ЗАДАЧИ')}</span>
        <h3>{t('Development and team leadership', 'Разработка и руководство командой')}</h3>
        <p>
          {t(
            'I develop Vinteo Mobile and coordinate development, testing and planning with the team. I introduced daily meetings, demos, Git conventions, documentation and testing practices.',
            'Разрабатываю Vinteo Mobile и координирую разработку, тестирование и планирование в команде. Ввёл daily, demo, Git-соглашения, работу с документацией и тестами.',
          )}
        </p>
        <div
          className="team-composition"
          aria-label={t('Team composition excluding myself', 'Состав команды помимо меня')}
        >
          <div>
            <Code2 size={19} />
            <strong>2</strong>
            <span>{t('developers', 'разработчика')}</span>
          </div>
          <div>
            <TestTube2 size={19} />
            <strong>2</strong>
            <span>{t('QA engineers', 'тестировщика')}</span>
          </div>
          <div>
            <ClipboardList size={19} />
            <strong>1</strong>
            <span>PM</span>
          </div>
        </div>
        <p className="team-scope">
          <Users size={14} />
          {t('Five colleagues, plus me as Team Lead.', 'Пять коллег и я в роли Team Lead.')}
        </p>
      </div>
      <div className="leadership-practices">
        {[
          [
            bi('Agile', 'Agile'),
            bi('Set up daily meetings and demos.', 'Организовал daily и demo.'),
          ],
          [
            bi('Git workflow', 'Работа с Git'),
            bi(
              'Defined conventions for working together in Git.',
              'Выстроил процесс совместной работы и Git-соглашения.',
            ),
          ],
          [
            bi('Documentation & tests', 'Документация и тесты'),
            bi(
              'Established documentation and testing practices.',
              'Организовал ведение документации и работу с тестами.',
            ),
          ],
          [
            bi('Monorepo', 'Монорепозиторий'),
            bi('Created a monorepo for the team.', 'Создал монорепозиторий для команды.'),
          ],
        ].map(([title, body], index) => (
          <div key={index}>
            <span>0{index + 1}</span>
            <div>
              <h4>{title[lang]}</h4>
              <p>{body[lang]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
