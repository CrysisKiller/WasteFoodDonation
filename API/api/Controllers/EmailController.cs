
using api.Dtos.Account;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/sendmail")]
    [ApiController]
    public class EmailController: ControllerBase
    {
         private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequestDto request)
        {
            await _emailService.SendEmailAsync(request.To, request.Subject, request.Body);
            return Ok();
        }
    }
}