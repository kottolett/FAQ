using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IndividuellOppgave_s315278.Model;
using Microsoft.AspNetCore.Mvc;

namespace IndividuellOppgave_s315278.Controllers
{
    [Route("api/[controller]")]
    public class FAQController : Controller
    {
        private readonly FAQContext _context;

        public FAQController(FAQContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public JsonResult Get()
        {
            var faqDb = new FAQDb(_context);
            List<FAQModel> allQuestions = faqDb.FindAllQuestions();
            return Json(allQuestions);
        }
        
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var faqDb = new FAQDb(_context);
            FAQModel aQuestion = faqDb.FindAQuestion(id);
            return Json(aQuestion);
        }
        
        [HttpPost]
        public JsonResult Post([FromBody]FAQModel inQuestion)
        {
            if (ModelState.IsValid)
            {
                var faqDb = new FAQDb(_context);
                bool OK = faqDb.SaveQuestion(inQuestion);
                if (OK)
                {
                    return Json("OK");
                }
            }
            return Json("Could not insert.");
        }
        
        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody]FAQModel inQuestion)
        {
            if (ModelState.IsValid)
            {
                var faqDb = new FAQDb(_context);
                bool OK = faqDb.EditQuestion(id, inQuestion);
                if (OK)
                {
                    return Json("OK");
                }
            }
            return Json("Could not edit.");
        }
        
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var faqDb = new FAQDb(_context);
            bool OK = faqDb.DeleteQuestion(id);
            if (!OK)
            {
                return Json("Could not delete.");
            }
            return Json("OK");
        }

    }
}
