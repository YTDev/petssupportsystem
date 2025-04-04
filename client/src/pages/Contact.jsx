import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      <div className="bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90%">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-[#103D62] mb-8">Contacte-nos</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#207CC8]"
                  placeholder="O seu nome"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#207CC8]"
                  placeholder="O seu email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Assunto</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#207CC8]"
                  placeholder="Assunto da mensagem"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Mensagem</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#207CC8] h-32"
                  placeholder="A sua mensagem"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-[#207CC8] hover:bg-[#103D62] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {status === 'sending' ? 'A enviar...' : 'Enviar Mensagem'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-center">Mensagem enviada com sucesso!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center">Erro ao enviar mensagem. Por favor, tente novamente.</p>
              )}
            </form>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-bold text-[#103D62] mb-2">Endereço</h3>
                <p className="text-gray-600">Rua Principal, 123<br />Lisboa, Portugal</p>
              </div>
              <div>
                <h3 className="font-bold text-[#103D62] mb-2">Telefone</h3>
                <p className="text-gray-600">+351 123 456 789</p>
              </div>
              <div>
                <h3 className="font-bold text-[#103D62] mb-2">Email</h3>
                <p className="text-gray-600">info@petsupport.pt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;