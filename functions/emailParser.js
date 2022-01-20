
const emailParser = async (emailStr) => {
  emailStr = emailStr.replace(/[\r\n]+/gm, '')
  emailStr = emailStr.replaceAll('/"', '')
  emailStr = emailStr.replaceAll('--', '')
  const splitStr = emailStr.split('xYzZY');
  const fields = splitStr.reduce((parsedFields, currentItem) => {
    currentItem = currentItem.replace('Content-Disposition: form-data; name="', '');
    let i = 0;
    let field = ''
    
    while (currentItem[i]) {
      if (currentItem[i] === '"') {
        break;
      }
      field += currentItem[i];
      i += 1;
    }
    let value;
    if (field === 'from') {
      value = ''
      for (let i = currentItem.length - 2; currentItem[i] !== '<'; i -= 1) {
        value = currentItem[i] + value;
      }
    } else {
      value = currentItem.substring(i + 1);
    }
    parsedFields[field] = value;
    return parsedFields;
  }, {})
  return fields;
};

module.exports = emailParser;












// const string = `--xYzZY
// Content-Disposition: form-data; name="dkim"

// {@gmail.com : pass}
// --xYzZY
// Content-Disposition: form-data; name="email"

// Received: by mx0143p1mdw1.sendgrid.net with SMTP id BYcJxfDjT1 Thu, 20 Jan 2022 16:55:22 +0000 (UTC)
// Received: from mail-pg1-f172.google.com (unknown [209.85.215.172]) by mx0143p1mdw1.sendgrid.net (Postfix) with ESMTPS id 6D1FFB60FF5 for <suliozhf@sulimantekalliviolin.com>; Thu, 20 Jan 2022 16:55:22 +0000 (UTC)
// Received: by mail-pg1-f172.google.com with SMTP id f8so5801932pgf.8 for <suliozhf@sulimantekalliviolin.com>; Thu, 20 Jan 2022 08:55:22 -0800 (PST)
// DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20210112; h=mime-version:from:date:message-id:subject:to; bh=JcjLlnoYqhjBcekBU82baU8ERE4DPCSPvTRHiC8cA+A=; b=YrOKdxcxJV5E1XiUhcBrnMl5FscFFbvo0LRIZrfkBIzk7+q2TjiZgX1C7OlY5FbGFX ly4YQKK2GwprTbXfsM6/HhZnUjAjQgtO7TNcI1zSNI+nRrU5xp/YlibMqcz8ruPt3uNu Q1z4qmM9EuoZMRilH7xdf3/Qxq8z6kRpdRNorfAZwulQi7khZalCMiPngt+fHoFjY2ur j+mEUCzZ1AGWtmY/2HXKRtXt/7aVWmZG9HA4/pCoqUq6s4MN6UKgxmgD1SXXlhwtkPco cUSPAIlKmv7i3Rv9ouLrzwiuFnTDU4szcZtWwgd2nWZmMXxdSc6sr57j605LCuhBVLYo ftjA==
// X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20210112; h=x-gm-message-state:mime-version:from:date:message-id:subject:to; bh=JcjLlnoYqhjBcekBU82baU8ERE4DPCSPvTRHiC8cA+A=; b=biFxNhTEOv8j21FGk6XXrMiDaZzzA7lacjkwIvCmWUk0fTdgAY3PLk1Lyc85lWHYKe xcSx4bNkId6py8fc3EwT5x1upRes9k1KcPf5DR/j4ZcZtlTfLcYQEUSS9hhWmDdYR8/Y 2rJmOOygcfhjYbf7LdFwovmDdYQxONfh4sibpyHQVtdztYkGtBgEJAAMZp5H2VkmQ8pn BXgYY0LuGnHSSPlOoY43MowZrWSL8rhE2YPGwc/iGBQNSPt/VLEoO9/Ya6qDo7wvOdpZ MwTblszbNL0k6mVuBitNgFl0B04EPjxFpaIB1RQlhfX4jrHL6CC6a6sKrZBQUaVK5/XB qGnw==
// X-Gm-Message-State: AOAM5300UAgdb5izV/PcxdLPeuUyV2iVkxq1wQ4JQ6qomFUWsGa/MrGF rU0NucCvVVM6OPOzCPKVFA8cc1OGz6T3mwemwoP7+GmYoRNc7A==
// X-Google-Smtp-Source: ABdhPJzjzyL8eN+tbevVycVUEszqnTkR57gejhe4eU5pDuNrAFXWhoFmY64bTHBXx9yhXbzIMJt/dh2vwPSrSMJt9Hk=
// X-Received: by 2002:a63:3fc5:: with SMTP id m188mr2118393pga.307.1642697721417; Thu, 20 Jan 2022 08:55:21 -0800 (PST)
// MIME-Version: 1.0
// From: Suliman Tekalli <sulimantekalli@gmail.com>
// Date: Thu, 20 Jan 2022 11:55:10 -0500
// Message-ID: <CAFZDRoeC245Jf0daSEnQDnGxeG4717o9aMo7JXxx91fN9XFrdg@mail.gmail.com>
// Subject: 
// To: suliozhf@sulimantekalliviolin.com
// Content-Type: multipart/alternative; boundary="00000000000028964605d6065e4b"

// --00000000000028964605d6065e4b
// Content-Type: text/plain; charset="UTF-8"

// -- 
// Suliman Tekalli
// Violinist
// www.sulimantekalliviolin.com

// --00000000000028964605d6065e4b
// Content-Type: text/html; charset="UTF-8"
// Content-Transfer-Encoding: quoted-printable

// <div dir=3D"ltr"><br clear=3D"all"><div><br></div>-- <br><div dir=3D"ltr" c=
// lass=3D"gmail_signature" data-smartmail=3D"gmail_signature">Suliman Tekalli=
// <br>Violinist<br><a href=3D"http://www.sulimantekalliviolin.com" target=3D"=
// _blank">www.sulimantekalliviolin.com</a><br><br><br><br></div></div>

// --00000000000028964605d6065e4b--

// --xYzZY
// Content-Disposition: form-data; name="to"

// suliozhf@sulimantekalliviolin.com
// --xYzZY
// Content-Disposition: form-data; name="from"

// Suliman Tekalli <sulimantekalli@gmail.com>
// --xYzZY
// Content-Disposition: form-data; name="sender_ip"

// 209.85.215.172
// --xYzZY
// Content-Disposition: form-data; name="envelope"

// {"to":["suliozhf@sulimantekalliviolin.com"],"from":"sulimantekalli@gmail.com"}
// --xYzZY
// Content-Disposition: form-data; name="subject"

// STOP
// --xYzZY
// Content-Disposition: form-data; name="charsets"

// {"to":"UTF-8","subject":"UTF-8","from":"UTF-8"}
// --xYzZY
// Content-Disposition: form-data; name="SPF"

// pass
// --xYzZY--'`
