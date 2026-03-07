export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-purple-50 via-white to-purple-50 border-t border-purple-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* LOGO AT TOP LEFT */}
        <div className="mb-4" style={{marginLeft: '-6.5rem'}}>
          <img
            src="/logo.png"
            alt="Silver Oak University IEEE WIE SB AG Logo"
            className="h-8 md:h-10 w-auto object-contain !m-0 !p-0"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-6 lg:gap-8">

          {/* ABOUT */}
          <div className="flex flex-col items-start">
            <h3 className="text-base font-bold text-purple-700 mb-1.5">
              Silver Oak University IEEE WIE SB AG
            </h3>
            <p className="text-xs font-semibold text-purple-600 mb-2">
              OU Code: SBA20233
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              Silver Oak University IEEE WIE SB AG aims to provide an interactive
              platform for students to develop professional and technical abilities.
            </p>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col items-start">
            <h4 className="text-base font-bold text-purple-700 mb-2.5">Contact Us</h4>
            <ul className="space-y-2 w-full">
              <li className="flex items-center gap-2 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-xs text-gray-800 font-medium">+91 79660 46304</span>
              </li>
              <li className="flex items-start gap-2 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div className="space-y-0.5">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ieee.fbc@socet.edu.in" target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-800 hover:text-purple-700 transition-colors">ieee.fbc@socet.edu.in</a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ieeewie.sc@silveroakuni.ac.in" target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-800 hover:text-purple-700 transition-colors">ieeewie.sc@silveroakuni.ac.in</a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ieeewie.tr@silveroakuni.ac.in" target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-800 hover:text-purple-700 transition-colors">ieeewie.tr@silveroakuni.ac.in</a>
                </div>
              </li>
              <li className="flex items-start gap-2 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <a href="https://www.google.com/maps/search/?api=1&query=Silver+Oak+University,+Ahmedabad" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-800 hover:text-purple-700 transition-colors">
                  Silver Oak University, Nr. Bhavik Publications, Opp. Bhagwat Vidyapith, S.G.Highway, Ahmedabad, Gujarat - 382481
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col items-start">
            <h4 className="text-base font-bold text-purple-700 mb-2.5">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.instagram.com/ieee_sou_wie_sb_ag/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://x.com/ieee_sou_wie" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61571506906506" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/ieee-sou-wie-sb-ag/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.threads.net/@ieee_sou_wie_sb_ag" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.17.408-2.243 1.33-3.023.88-.744 2.084-1.168 3.59-1.264 1.078-.069 2.089.009 3.025.218-.054-1.18-.476-2.072-1.256-2.596-.585-.393-1.362-.594-2.306-.597h-.037c-.94 0-1.876.322-2.408.878l-1.46-1.338C8.547 4.97 10.094 4.47 11.67 4.47h.05c2.647.018 4.584 1.627 5.042 4.207.255-.045.516-.08.783-.103l.058-.003c1.63-.068 3.093.38 4.117 1.263 1.1.95 1.737 2.357 1.843 4.072.145 2.348-.697 4.425-2.434 6.012C19.139 21.735 16.362 22.98 12.186 24zm-.09-10.678c-1.2.077-2.076.394-2.602.943-.38.396-.565.856-.537 1.33.038.672.438 1.24 1.128 1.596.561.29 1.267.42 1.978.367 1.29-.07 2.246-.625 2.84-1.648.34-.586.567-1.313.674-2.162-.929-.235-1.94-.38-2.911-.38-.19 0-.38.005-.57.016v-.062z" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-purple-200 bg-purple-50 py-3 text-center">
        <p className="text-xs text-gray-700 font-medium">
          © {new Date().getFullYear()} Silver Oak University IEEE SB. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
}
