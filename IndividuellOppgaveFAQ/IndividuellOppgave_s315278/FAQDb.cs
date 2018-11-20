using IndividuellOppgave_s315278.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IndividuellOppgave_s315278
{
    public class FAQDb
    {
        private readonly FAQContext _context;
        public FAQDb(FAQContext context)
        {
            _context = context;
        }

        public List<FAQModel> FindAllQuestions()
        {
            List<FAQModel> allQuestions = _context.FAQ.Select(q => new FAQModel()
            {
                id = q.id,
                question = q.question,
                answer = q.answer,
                asker = q.asker,
                upVotes = q.upVotes,
                totalVotes = q.totalVotes,
                category = q.category
            }).ToList();
            return allQuestions;
        }

        public List<FAQModel> FindCatQuestions(string category)
        {
            List<FAQModel> catQuestions = _context.FAQ.Include(q => q.category == category).Select(q => new FAQModel()
            {
                id = q.id,
                question = q.question,
                answer = q.answer,
                asker = q.asker,
                upVotes = q.upVotes,
                totalVotes = q.totalVotes,
                category = q.category
            }).ToList();
            return catQuestions;
        }

        public FAQModel FindAQuestion(int id)
        {
            FAQModel oneDBQuestion = _context.FAQ.FirstOrDefault(q => q.id == id);

            var oneQuestion = new FAQModel()
            {
                id = oneDBQuestion.id,
                question = oneDBQuestion.question,
                answer = oneDBQuestion.answer,
                asker = oneDBQuestion.asker,
                upVotes = oneDBQuestion.upVotes,
                totalVotes = oneDBQuestion.totalVotes,
                category = oneDBQuestion.category
            };
            return oneQuestion;
        }

        public bool SaveQuestion(FAQModel inQuestion)
        {
            var newQuestion = new FAQModel
            {
                question = inQuestion.question,
                answer = inQuestion.answer,
                asker = inQuestion.asker,
                upVotes = inQuestion.upVotes,
                totalVotes = inQuestion.totalVotes,
                category = inQuestion.category
            };
            try
            {
                _context.FAQ.Add(newQuestion);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public bool EditQuestion(int id, FAQModel inQuestion)
        {
            FAQModel existQuestion = _context.FAQ.FirstOrDefault(k => k.id == id);
            if (existQuestion == null)
            {
                return false;
            }
            existQuestion.question = inQuestion.question;
            existQuestion.answer = inQuestion.answer;
            existQuestion.asker = inQuestion.asker;
            existQuestion.upVotes = inQuestion.upVotes;
            existQuestion.totalVotes = inQuestion.totalVotes;
            existQuestion.category = inQuestion.category;

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public bool DeleteQuestion(int id)
        {
            try
            {
                FAQModel findQuestion = _context.FAQ.Find(id);
                _context.FAQ.Remove(findQuestion);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
    }
}
